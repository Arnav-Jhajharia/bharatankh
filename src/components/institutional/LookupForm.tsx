
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const lookupSchema = z.object({
  aadhaarNumber: z.string().regex(/^\d{12}$/, { message: "Aadhaar number must be 12 digits" }),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type LookupData = z.infer<typeof lookupSchema>;

interface LookupFormProps {
  onSubmit: (values: LookupData) => void;
  isLoading: boolean;
}

export const LookupForm = ({ onSubmit, isLoading }: LookupFormProps) => {
  const form = useForm<LookupData>({
    resolver: zodResolver(lookupSchema),
    defaultValues: {
      aadhaarNumber: "",
    },
  });

  return (
    <Card className="lookup-form-card">
      <CardHeader>
        <CardTitle className="lookup-form-title">
          <Search className="lookup-icon" />
          Customer Lookup
        </CardTitle>
        <CardDescription className="lookup-form-description">
          Enter Aadhaar number and date of birth to access customer financial profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lookup-form">
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123456789012" 
                      {...field} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        field.onChange(value);
                      }}
                      maxLength={12}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="date-field">
                  <FormLabel className="form-label">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "date-picker-button",
                            !field.value && "date-picker-placeholder"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date of birth</span>
                          )}
                          <CalendarIcon className="date-picker-icon" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="calendar-popover" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1940-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Looking up..." : "Lookup Customer"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
