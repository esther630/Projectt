import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          
          <div className="col-span-2 md:col-span-1">
          
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">MAWU</span>
                <span className="text-xs text-muted-foreground">Writers Union</span>
              </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Promoting literary excellence and empowering Malawian writers since 1995.
            </p>
          </div>

         
          <div>
            <h3 className="text-sm font-semibold text-foreground">Discover</h3>
            <ul className="mt-4 space-y-2">
           
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">For Writers</h3>
            <ul className="mt-4 space-y-2">
           
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Community</h3>
            <ul className="mt-4 space-y-2">
             
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">About</h3>
            <ul className="mt-4 space-y-2">
             
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Malawi Writers Union. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
 export default Footer;