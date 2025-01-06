import { CandlestickChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import '@/lib/auth'

export default function ReAuthForm({
  className,
  submitHandler,
  message,
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
}: {className:string, submitHandler:Function, message:string}) {


  return (

    <div className={cn("flex flex-col gap-6 border-white border-6 border-solid", className)} >
      <form action={() => submitHandler()}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <CandlestickChart className="size-24" />
              </div>
              <span className="sr-only">Stock Market Simulator</span>
            </a>
            <h1 className="text-xl font-bold w-fit whitespace-nowrap">Sign in again to confirm <span className="text-red-500">Account Deletion</span></h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="text-red-500">
              {message && message}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          
        </div>
      </form>
    </div>
  )
}
