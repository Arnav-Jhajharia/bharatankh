
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  finNumber: z
    .string()
    .regex(/^[STFG]\d{7}[A-Z]$/, { message: "Invalid FIN/TIN format" }),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
});

const KycVerification = () => {
  const navigate = useNavigate();
  const { updateUserData } = useApp();
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      finNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserData({
      name: values.fullName,
      pan: values.finNumber,
      dob: values.dob,
    });
    
    // Simulate verification
    setTimeout(() => {
      setIsVerified(true);
      updateUserData({ isVerified: true });
    }, 1500);
  };

  const handleContinue = () => {
    navigate("/bank-linking");
  };

  return (
    <PageContainer>
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-primary">FinBridge</h1>
      </div>
      
      <Card className="w-full animate-fade-in shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">eKYC Verification</CardTitle>
          <CardDescription>
            Please provide your details to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="finNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FIN / TIN Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="S1234567D" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e.target.value.toUpperCase());
                          }}
                          maxLength={9}
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select your date of birth</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1940-01-01")
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Verify with SingPass
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <CheckCircle className="h-16 w-16 text-accent mb-4" />
                <h3 className="text-xl font-semibold">Identity Verified!</h3>
                <p className="text-gray-500 mt-2 text-center">
                  Your identity has been successfully verified with SingPass
                </p>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default KycVerification;
