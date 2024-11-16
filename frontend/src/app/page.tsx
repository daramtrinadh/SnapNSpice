// app/page.js
"use client";
import Header from './Header/Header';
import Footer from './Footer';
import Home from './Home/Home';
import withAuth from './Authentication/withAuth';

const ProtectedHome = withAuth(Home); 

const Page = () => {
  return (
    <div>
      <Header />
      <ProtectedHome />
      <Footer />
    </div>
  );
};

export default Page;
