// src/pages/LoadingPage.jsx
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <Card className="w-[300px] shadow-xl border border-border">
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-5">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
          <p className="text-base font-medium text-muted-foreground">
            Loading Admin Panel...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
