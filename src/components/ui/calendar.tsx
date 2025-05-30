
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 80;
    const endYear = currentYear;
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (year: string) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(year));
    setCurrentDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(months.indexOf(month));
    setCurrentDate(newDate);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6 pointer-events-auto bg-white rounded-3xl shadow-2xl border-0", className)}
      month={currentDate}
      onMonthChange={setCurrentDate}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-6",
        caption: "flex justify-center pt-2 pb-4 relative items-center",
        caption_label: "text-lg font-semibold hidden",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          "h-10 w-10 bg-gray-50 hover:bg-gray-100 rounded-full border-0 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md",
          "opacity-80 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-2",
        head_row: "flex mb-3",
        head_cell: "text-gray-500 rounded-xl w-12 h-8 font-medium text-sm flex items-center justify-center",
        row: "flex w-full mt-1",
        cell: "h-12 w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
        day: cn(
          "h-12 w-12 p-0 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50",
          "text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-200",
          "aria-selected:opacity-100 border-0 bg-transparent hover:bg-gray-50"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-500 focus:text-white shadow-lg font-semibold",
        day_today: "bg-gray-100 text-gray-900 font-semibold",
        day_outside: "day-outside text-gray-300 opacity-50 hover:bg-transparent hover:text-gray-300",
        day_disabled: "text-gray-200 opacity-30 cursor-not-allowed hover:bg-transparent",
        day_range_middle: "aria-selected:bg-orange-100 aria-selected:text-orange-700",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5 text-gray-600" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5 text-gray-600" />,
        Caption: ({ displayMonth }) => (
          <div className="flex items-center gap-3 w-full justify-center">
            <Select value={months[displayMonth.getMonth()]} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-36 h-10 text-base font-medium border-0 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 [&>svg]:hidden shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
                {months.map((month) => (
                  <SelectItem key={month} value={month} className="rounded-xl mx-1 my-0.5 text-base py-3 focus:bg-gray-50">
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={displayMonth.getFullYear().toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-24 h-10 text-base font-medium border-0 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 [&>svg]:hidden shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60 rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
                {years.reverse().map((year) => (
                  <SelectItem key={year} value={year.toString()} className="rounded-xl mx-1 my-0.5 text-base py-3 focus:bg-gray-50">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
