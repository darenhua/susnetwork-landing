"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().email().min(1),
});

export default function Page() {
    const supabaseUrl = "https://dobdoinixcewibimloos.supabase.co";
    // This is a public key, its fine
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYmRvaW5peGNld2liaW1sb29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjYzNTQsImV4cCI6MjA2NDE0MjM1NH0.mkOxFR35ZpQ9-NjteVpOTy5-bPr4khc85knDf4XsPPU";

    const supabase = createClient(supabaseUrl, supabaseKey);

    const [emailCount, setEmailCount] = useState<number>(0);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const email = values.email;
        const { data, error } = await supabase
            .from("waitlist")
            .insert({ email });
        if (error) {
            toast.error("Email already on the list!");
            console.error(error);
            return;
        }
        form.reset();
        toast.success("You're on the list!", {
            description: "You'll get an email when the app is ready.",
        });
    }

    useEffect(() => {
        const fetchEmails = async () => {
            const { data, error } = await supabase.from("waitlist").select("*");
            if (error) {
                console.error(error);
            }
            setEmailCount(data?.length ?? 0);
        };
        fetchEmails();
    }, []);

    const daysUntil = Math.ceil(
        (new Date("2025-06-16").getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
    );

    return (
        <div className="p-8">
            <Link className="text-custom-accent" href="/">
                (back button)
            </Link>
            <p className="text-xl mt-6">
                I'm still building this, so I can't direct this to the main app
                link YET!
            </p>
            <p className="font-londrina text-2xl  font-bold mt-3">
                BUT PLEASE JOIN{" "}
                <span className="bg-custom-accent px-3 mx-1 text-white">
                    {emailCount}
                </span>{" "}
                OTHERS ON THE EMAIL LIST :D!!!
            </p>
            <p className="text-xl mt-3">See y'all in SF in {daysUntil} days.</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            className="mt-3 h-32 text-3xl sm:text-2xl"
                                            placeholder="thankyou@verymuch.com"
                                            type="email"
                                            required
                                            {...field}
                                        />
                                        <Button
                                            type="submit"
                                            className="mt-3 absolute bottom-1/2 translate-y-1/2 right-3"
                                        >
                                            Join List
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
