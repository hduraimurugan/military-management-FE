import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/components/ui/alert";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
    AlertCircle,
    Info,
    CheckCircle2,
    ShieldAlert,
    Bell,
    Trash2,
    LogOut,
    User, Home, Settings, Check, ChevronsUpDown,
    ArrowUpDown, ChevronDown, MoreHorizontal,
} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"


import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { useForm } from "react-hook-form"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { toast } from "sonner"
import { MessageSquareText } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { useState } from "react";
import { format } from "date-fns"


const ShadeCnComponents = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-center gap-2 w-full">
                <div className="flex flex-col gap-2 ">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline">Open Drawer</Button>
                        </DrawerTrigger>

                        <DrawerContent>
                            <div className="mx-auto w-full max-w-md px-4">
                                <DrawerHeader className="text-center space-y-2">
                                    <DrawerTitle className="text-xl font-semibold">
                                        Are you absolutely sure?
                                    </DrawerTitle>
                                    <DrawerDescription>
                                        This action cannot be undone.
                                    </DrawerDescription>
                                </DrawerHeader>

                                <DrawerFooter className="flex justify-center gap-4 pt-2">
                                    <Button>Submit</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <DropdownMenuDemo />
                    <HoverCardDemo />
                    <InputOTPDemo />
                    <SonnerDemo />
                    <SwitchDemo />
                     <TabsDemo />
                      <UserForm />
                </div>

            </div>

            <div className="">
               
            </div>



            {/* Button */}
            <div>
                <p className="text-xl font-semibold mb-2">ShadCN Button Variants</p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </div>
            {/* Badge */}
            <div>
                <p className="text-xl font-semibold mb-2">ShadCN Badge Variants</p>
                <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
            </div>

            <div className="flex items-start justify-start gap-4">
                <DialogDemo />

                <ShadeCnAccordion />
                <AllAlerts />
                <AllAlertDialogs />
                <ComboboxDemo />
                <DatePickerDemo />

            </div>

            <div className="flex items-center justify-start gap-4">
                <AllAvatars />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1">
                                <Home className="w-4 h-4" /> Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/settings" className="flex items-center gap-1">
                                <Settings className="w-4 h-4" /> Settings
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border bg-white"
                />
                <CheckboxWithText />
            </div>

            {/* Cards */}
            <div className="flex items-start justify-start flex-wrap gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Card</CardTitle>
                        <CardDescription>This is a simple card component.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This card contains a basic layout with a title, description, and content.</p>
                    </CardContent>
                </Card>

                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Product Name</CardTitle>
                        <CardDescription>$19.99</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Short description about the product. It looks great!</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <Button>Add to Cart</Button>
                        <span className="text-sm text-muted-foreground">In Stock</span>
                    </CardFooter>
                </Card>


                <Card>
                    <CardHeader>
                        <CardTitle>Action Card</CardTitle>
                        <CardDescription>Includes buttons at the footer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Use this layout when the card triggers an action.</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm</Button>
                    </CardFooter>
                </Card>

                <Card className="w-[300px]">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                        alt="Card image"
                        className="w-full h-[150px] object-cover rounded-t-md"
                    />
                    <CardHeader>
                        <CardTitle>Image Card</CardTitle>
                        <CardDescription>Includes an image at the top.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Great for blog previews, product cards, etc.</p>
                    </CardContent>
                </Card>


                <Card className="w-[300px]">
                    <CardHeader>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-[80%]" />
                    </CardContent>
                </Card>


                <Card className="transition-shadow hover:shadow-lg cursor-pointer">
                    <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>Hover to see effects!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>You can add interactivity with Tailwind classes.</p>
                    </CardContent>
                </Card>

                <Card className="p-2">
                    <CardContent className="p-2">
                        <p>This card is more compact.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Card with Footer</CardTitle>
                        <CardDescription>Here’s a footer example.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Cards are great for displaying related information in a grouped layout.</p>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-muted-foreground">Last updated 2 mins ago</p>
                    </CardFooter>
                </Card>


            </div>

            <div className="bg-white p-4 rounded-3xl flex items-start justify-start flex-wrap gap-4">
                <DataTableDemo />
            </div>


        </div >
    );
};


export function SonnerDemo() {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast("New Message from Durai", {
                    description: <span className="text-xs text-gray-800">
                        Hey! Are you joining the call now?
                    </span>,
                    icon: <MessageSquareText className="text-blue-950 w-5 h-5 " />,
                    action: {
                        label: "Reply",
                        onClick: () => console.log("Reply clicked"),
                    },
                })
            }
        >
            Simulate Message Toast
        </Button>
    )
}

export function SwitchDemo() {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Switch
                    id="red"
                    className="data-[state=checked]:bg-red-500"
                />
                <Label htmlFor="red">Red</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="green"
                    className="data-[state=checked]:bg-green-500"
                />
                <Label htmlFor="green">Green</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="green"
                    className="data-[state=checked]:bg-emerald-500"
                />
                <Label htmlFor="emerald">Emerald</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="blue"
                    className="data-[state=checked]:bg-sky-500"
                />
                <Label htmlFor="sky">Sky</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="blue"
                    className="data-[state=checked]:bg-blue-500"
                />
                <Label htmlFor="blue">Blue</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="blue"
                    className="data-[state=checked]:bg-indigo-500"
                />
                <Label htmlFor="indigo">Indigo</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="yellow"
                    className="data-[state=checked]:bg-yellow-400"
                />
                <Label htmlFor="yellow">Yellow</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="yellow"
                    className="data-[state=checked]:bg-amber-400"
                />
                <Label htmlFor="amber">Amber</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="purple"
                    className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="purple">Purple</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="pink"
                    className="data-[state=checked]:bg-pink-500"
                />
                <Label htmlFor="pink">Pink</Label>
            </div>
        </div>
    )
}

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}



export function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Dropdown menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function UserForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            birthDate: "",
            phone: "",
            gender: "",
            termsAccepted: false,
        },
    })

    const onSubmit = (data) => {
        console.log("Form submitted:", data)
    }

    return (
        <div className="max-w-md w-auto p-6 border rounded-2xl shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">User Registration Form</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Enter a valid email",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@mail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Birth Date */}
                    <FormField
                        control={form.control}
                        name="birthDate"
                        rules={{ required: "Birth date is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Birth Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter a valid 10-digit phone number",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        rules={{ required: "Please select your gender" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Terms & Conditions */}
                    <FormField
                        control={form.control}
                        name="termsAccepted"
                        rules={{ required: "You must accept the terms" }}
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>I agree to the Terms and Conditions</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export function HoverCardDemo() {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined December 2021
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export function InputOTPDemo() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <InputOTP maxLength={6} >
                <InputOTPGroup className="bg-white rounded-2xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="bg-white rounded-2xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <InputOTP maxLength={6} >
                <InputOTPGroup className="bg-white rounded-2xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    {/* </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="bg-white rounded-2xl"> */}
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}

export const ShadeCnAccordion = () => {
    return (
        <div className="space-y-4">

            <Accordion type="single" collapsible className="w-full max-w-md">

                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it customizable?</AccordionTrigger>
                    <AccordionContent>
                        Yes. You can style it with Tailwind or add animations and icons.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it server-side compatible?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. Works well with both SSR and client-rendered React apps.
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
};

export function AllAlerts() {
    return (
        <div className="space-y-4 max-w-xl">
            {/* Default Alert */}
            <Alert>
                <Info className="h-4 w-4 text-blue-500" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                    This is a general alert message to notify the user.
                </AlertDescription>
            </Alert>

            {/* Destructive Alert */}
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your session has expired. Please log in again.
                </AlertDescription>
            </Alert>

            {/* Success Alert (customized) */}
            <Alert className="border-green-500 bg-green-100 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                    Your changes have been saved successfully.
                </AlertDescription>
            </Alert>

            {/* Warning Alert (customized) */}
            <Alert className="border-yellow-500 bg-yellow-100 text-yellow-800">
                <ShieldAlert className="h-4 w-4 text-yellow-600" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                    You're approaching your storage limit.
                </AlertDescription>
            </Alert>

            {/* Notification Alert */}
            <Alert className="border-purple-500 bg-purple-100 text-purple-800">
                <Bell className="h-4 w-4 text-purple-600" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    New updates are available. Click here to refresh.
                </AlertDescription>
            </Alert>
        </div>
    );
}

export function AllAlertDialogs() {
    return (
        <div className="space-y-4 p-6">
            {/* ❗ Delete (Destructive) */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* 🔒 Logout */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be logged out from all devices. Are you sure?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Stay</AlertDialogCancel>
                        <AlertDialogAction>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ⚠️ Warning */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Warning
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Proceed with caution</AlertDialogTitle>
                        <AlertDialogDescription>
                            Changing these settings might affect system stability.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Proceed</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ✅ Success Confirmation */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Done
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Completion</AlertDialogTitle>
                        <AlertDialogDescription>
                            This task will be marked as complete. Continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ℹ️ Info Dialog */}
            <AlertDialog>
                <AlertDialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Show Info
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>System Information</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your current plan supports up to 5 projects. Upgrade to increase limits.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction>Upgrade</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export function AllAvatars() {
    return (
        <div className="flex flex-wrap gap-6 p-6 items-center">

            {/* 👤 1. Basic Avatar */}
            <div className="text-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm mt-1">Basic</p>
            </div>

            {/* 🧑 2. Avatar with Fallback Initials only */}
            <div className="text-center">
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="text-sm mt-1">Initials Only</p>
            </div>

            {/* 🧢 3. Avatar with Icon Fallback */}
            <div className="text-center">
                <Avatar>
                    <AvatarFallback>
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <p className="text-sm mt-1">With Icon</p>
            </div>

            {/* 🟢 4. Avatar with Status Indicator */}
            <div className="relative text-center">
                <Avatar>
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <p className="text-sm mt-1">With Online Status</p>

            {/* 🌟 5. Large Avatar */}
            <div className="text-center">
                <Avatar className="w-20 h-20">
                    <AvatarImage src="https://i.pravatar.cc/100?u=user1" />
                    <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <p className="text-sm mt-1">Large Size</p>
            </div>

            {/* 💬 6. Avatar with Verified Badge */}
            <div className="relative text-center">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="https://i.pravatar.cc/100?u=user2" />
                    <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                <CheckCircle2 className="absolute bottom-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full" />
                <p className="text-sm mt-1">Verified</p>
            </div>
        </div>
    )
}

export function CheckboxWithText() {
    return (
        <div className="items-top flex space-x-2 bg-white p-4 rounded-2xl">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function ComboboxDemo() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


export function DatePickerDemo() {
    const [date, setDate] = useState()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



const data = [
    { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
    { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
    { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
    { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
    { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
]

const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={table.getColumn("email")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter((col) => col.getCanHide()).map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() ? "selected" : undefined}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default ShadeCnComponents;
