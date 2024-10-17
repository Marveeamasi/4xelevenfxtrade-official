import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "4Elevenfxtrade - Crypto currency investment platform",
  description: "Invest in crypto today and earn more" ,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <AuthContextProvider>
        {children}
        </AuthContextProvider>
        </body>
    </html>
  );
}
