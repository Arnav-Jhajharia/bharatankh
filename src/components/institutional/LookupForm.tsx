
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
    <Card className="mx-auto max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="text-center pb-6 pt-8 px-8">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold text-gray-900">
          <div className="p-3 bg-orange-100 rounded-2xl">
            <Search className="h-6 w-6 text-orange-600" />
          </div>
          Customer Lookup
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-3 leading-relaxed">
          Enter Aadhaar number and date of birth to access customer financial profile
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="aadhaarNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-800">Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123456789012" 
                      {...field} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        field.onChange(value);
                      }}
                      maxLength={12}
                      className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-0 transition-colors duration-200 bg-gray-50/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-2" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-800">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 text-left font-normal border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200 text-base",
                            !field.value && "text-gray-500"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date of birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-5 w-5 opacity-60" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-0 shadow-2xl" align="start">
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
                  <FormMessage className="text-red-500 text-sm mt-2" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl mt-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Looking up...
                </div>
              ) : (
                "Lookup Customer"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
