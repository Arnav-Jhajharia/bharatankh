
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import PageContainer from "@/components/PageContainer";
import { useApp } from "@/context/AppContext";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters"
  }),
  aadhaarNumber: z.string().regex(/^\d{12}$/, {
    message: "Aadhaar number must be 12 digits"
  }),
  dob: z.date({
    required_error: "Date of birth is required"
  })
});

const KycVerification = () => {
  const navigate = useNavigate();
  const { updateUserData } = useApp();
  const [isVerified, setIsVerified] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      aadhaarNumber: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserData({
      name: values.fullName,
      aadhaar: values.aadhaarNumber,
      dob: values.dob
    });

    // Simulate verification
    setTimeout(() => {
      setIsVerified(true);
      updateUserData({
        isVerified: true
      });
    }, 1500);
  };

  const handleContinue = () => {
    navigate("/bank-linking");
  };

  return (
    <PageContainer className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50">
      {/* Header */}
      <div className="flex justify-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          <span style={{ color: '#f47615' }}>Bharat</span>
          <span style={{ color: '#86dcf4' }}>Ankh</span>
        </h1>
      </div>
      
      {/* Main Card */}
      <Card className="w-full border-0 shadow-sm bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center px-8 pt-12 pb-8">
          <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
            Identity Verification
          </CardTitle>
          <CardDescription className="text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
            Securely verify your identity using your Aadhaar details to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-12">
          {!isVerified ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                  control={form.control} 
                  name="fullName" 
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-gray-800 tracking-wide">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          className="h-14 rounded-2xl border-gray-200/80 bg-gray-50/50 text-base px-6 focus:bg-white focus:border-orange-300 focus:ring-orange-100 transition-all duration-200 placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="aadhaarNumber" 
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-gray-800 tracking-wide">
                        Aadhaar Number
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123456789012" 
                          {...field} 
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                            field.onChange(value);
                          }}
                          maxLength={12}
                          className="h-14 rounded-2xl border-gray-200/80 bg-gray-50/50 text-base px-6 focus:bg-white focus:border-orange-300 focus:ring-orange-100 transition-all duration-200 placeholder:text-gray-400 font-mono tracking-wider"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="dob" 
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium text-gray-800 tracking-wide">
                        Date of Birth
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-14 rounded-2xl border-gray-200/80 bg-gray-50/50 text-base px-6 font-normal justify-start focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all duration-200 shadow-sm hover:shadow-md hover:bg-white",
                                !field.value && "text-gray-400"
                              )}
                            >
                              {field.value ? (
                                <span className="text-gray-900 font-medium">
                                  {format(field.value, "MMMM d, yyyy")}
                                </span>
                              ) : (
                                "Select your date of birth"
                              )}
                              <CalendarIcon className="ml-auto h-5 w-5 text-gray-400" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent 
                          className="w-auto p-0 rounded-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-xl" 
                          align="start"
                        >
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
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )} 
                />
                
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-white font-medium text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-0"
                  >
                    Verify Identity
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center mb-6 ring-8 ring-green-50">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                  Verification Complete
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                  Your identity has been successfully verified. You can now proceed to the next step.
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleContinue} 
                  className="w-full h-14 text-white font-medium text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-0"
                >
                  Continue Setup
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default KycVerification;
