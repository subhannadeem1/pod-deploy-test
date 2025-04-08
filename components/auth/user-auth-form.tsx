"use client"

import * as React from "react"
import * as z from "zod"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
})

type FormData = z.infer<typeof userAuthSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: { email: "" },
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    // TODO: Add Sign In Using Preferred Provider
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const signInResult = { ok: true }
    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast.error("Something went wrong.", {
        description: "Your sign in request failed. Please try again.",
      })
    }

    return toast.success("Check your email", {
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  async function onSignIn() {
    console.log("Sign In")
  }

  async function onSignInGithub() {
    setIsGitHubLoading(true)
    
    // TODO: Add Sign In Using Preferred Provider
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsGitHubLoading(false)
  }

  return (
    <div className = { cn("grid gap-6", className) } { ...props }>
      
      <Form { ...form }>
        
        <form onSubmit = { form.handleSubmit(onSubmit) }>
          
          <div className = "grid gap-4">
            
            <FormField control = { form.control } name = "email"
              
              render = { ({ field }) => (
                
                <FormItem>
                  
                  <FormControl>
                    
                    <Input id = "email" placeholder = "name@example.com" type = "email" autoCapitalize = "none" autoComplete = "email" autoCorrect = "off" disabled = { isLoading || isGitHubLoading } { ...field }/>
                  
                  </FormControl>
                  
                  <FormMessage />
                
                </FormItem>

              )}
            />

            <button type = "submit" className = { cn(buttonVariants()) } disabled = { isLoading || isGitHubLoading } onClick = { () => { onSignIn() }}>
              
              { isLoading && <Loader2 className = "mr-2 h-4 w-4 animate-spin" /> }Sign In with Email
            
            </button>

          </div>

        </form>

      </Form>
      
      <div className = "relative">
        
        <div className = "absolute inset-0 flex items-center">
          
          <span className = "w-full border-t" />
        
        </div>
        
        <div className = "relative flex justify-center text-xs uppercase">
          
          <span className = "bg-background px-2 text-muted-foreground">Or continue with</span>
        
        </div>

      </div>

      <button type = "button" className = { cn(buttonVariants({ variant: "outline" })) } onClick = { () => { onSignInGithub() }} disabled = { isLoading || isGitHubLoading }>
        
        { isGitHubLoading ? (<Loader2 className = "mr-2 h-4 w-4 animate-spin" />) : (<GitHubLogoIcon className = "mr-2 h-4 w-4" />)}{" "}Github
      
      </button>

    </div>
  )
}