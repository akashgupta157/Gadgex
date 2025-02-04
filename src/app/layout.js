import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Gadgex",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
