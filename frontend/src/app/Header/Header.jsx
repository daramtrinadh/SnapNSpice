"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import './header.css';
import Link from 'next/link';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
  } from "../components/ui/animated-modal";

const Header = () => {
    const [userDetails, setUser] = useState(null);
    const logout=()=>{
        localStorage.removeItem("recipetoken")
        localStorage.removeItem("recipeUser")
        window.location.reload();
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("recipeUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser); // Parse JSON to object
            setUser(parsedUser); 
        }
    }, []);

    return (
        <div className='header'>
            <Link href="/">
                <Image src="/SnapNSpice.png" width={50} height={50} className='logo' alt='logo' />
            </Link>
            <h1 className='tagline'>Capture, Cook, and Share the Flavor</h1>

            <div>
                {userDetails ? (
                   <Modal>
                    <ModalTrigger className="bg-white dark:bg-black dark:text-black text-black text-xl flex justify-center group/modal-btn">
                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        {userDetails.username}
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        👤
                        </div>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                        <h4 className="text-lg mt-10 md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center ">
                        Are you sure You want to {" "}
                        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                            logout
                        </span>{" "}
                        now! 👤
                        </h4>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                        
                            <button onClick={logout} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Log Out
                            </button>
                        </ModalFooter>
                    </ModalBody>
                    {/* <div className="user-badge">
                        <span className="user-icon">👤</span> 
                        <span className="user-name">{userDetails.username}</span>
                    </div> */}
                    </Modal>
                ) : (
                    // Display login button if no user is logged in
                    <button type="button" className='login-btn'>
                        <Link href="/Login">Login</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
