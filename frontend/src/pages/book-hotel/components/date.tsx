import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../../components/ui/calendar";

import { useDateStore } from "../../../store";

// Define the form schema with two date fields
const FormSchema = z
  .object({
    fromDate: z.date({
      required_error: "Check-in date is required.",
    }),
    toDate: z.date({
      required_error: "Check-out date is required.",
    }),
  })
  .refine((data) => data.toDate > data.fromDate, {
    message: "Check-out date must be after check-in date.",
    path: ["toDate"],
  });

export default function SelectDate() {
  const today = new Date();
  const { fromDate, toDate, setFromDate, setToDate } = useDateStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast.success("Booking dates selected!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* From Date Picker (Check-in) */}
        <FormField
          control={form.control}
          name="fromDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-in Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-sm pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setFromDate(date);
                    }}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* To Date Picker (Check-out) */}
        <FormField
          control={form.control}
          name="toDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-out Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-sm pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!fromDate} // Disable until check-in date is selected
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setToDate(date);
                    }}
                    disabled={(date) => !fromDate || date <= fromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant={"outline"}>
          Select Dates
        </Button>
      </form>
    </Form>
  );
}
