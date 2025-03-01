import { FormEvent, useState } from "react";
import { loginUser } from "../api/securityApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Errors {
   email: boolean;
   password: boolean;
}

const SignInPage = () => {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [errors, setErrors] = useState<Errors>({
      email: false,
      password: false,
   });

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors: Errors = {
         email: !email,
         password: !password,
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
         setError("Please fill in all required fields.");
         return;
      }

      setError("");
      try {
         const result = await loginUser(email, password);

         if (result.successful) {
            const { accessToken } = result.data || {};

            if (accessToken) {
               Cookies.set("accessToken", accessToken.value, {
                  expires: 30,
                  path: "/",
               });
            } else {
               setError("Access token is missing.");
               return;
            }

            navigate("/");
         } else {
            setError(result.error?.message || "Authentication failed.");
         }
      } catch (error: unknown) {
         if (error instanceof Error) {
            setError(error.message);
         } else {
            setError("An unknown error occurred.");
         }
      }
   };

   return (
      <div className="flex justify-center px-24 items-center h-screen overflow-hidden">
         <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-4 p-4 w-[70%] md:w-1/3 xl:w-[30%]"
         >
            <p className="text-transparent text-center bg-clip-text bg-text-gradient p-2 font-extrabold mb-4 text-2xl md:text-3xl lg:text-4xl">
               Log in
            </p>
            <div className="relative mb-4 flex items-center border rounded-sm">
               <div className="px-3 py-2 flex items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-5 text-gray-400"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                     />
                  </svg>
               </div>
               <div className="h-7 w-[1px] bg-gray-300"></div>
               <input
                  className={`w-full p-2 pl-3 outline-none ${
                     errors.email || error ? "bg-red-500 bg-opacity-30" : ""
                  }`}
                  placeholder="Email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="relative mb-4 flex items-center border rounded-sm">
               <div className="px-3 py-2 flex items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="text-gray-400 size-5"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                     />
                  </svg>
               </div>
               <div className="h-7 w-[1px] bg-gray-300"></div>
               <input
                  className={`w-full p-2 pl-3 outline-none ${
                     errors.password || error ? "bg-red-500 bg-opacity-30" : ""
                  }`}
                  placeholder="Wachtwoord"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}
               >
                  {showPassword ? (
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-400 "
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                     </svg>
                  ) : (
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-400"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                     </svg>
                  )}
               </button>
            </div>
            {error && (
               <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button className="p-2 text-lg font-semibold hover:bg-orange-600 duration-300 bg-[#EF6F28] text-white rounded-sm">
               Inloggen
            </button>
         </form>
      </div>
   );
};

export default SignInPage;
