import { FormEvent, useState } from "react";

interface AddUserProps {
   onSubmit: (email: string, password: string) => void;
   error: string;
}

const AddUserForm = ({ onSubmit, error }: AddUserProps) => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [showPassword, setShowPassword] = useState<boolean>(false);

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(email, password);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col gap-y-4 p-4 w-[80%] md:w-[60%]"
      >
         <input
            className="w-full p-2 outline-none border rounded-sm"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
         />
         <div className="relative">
            <input
               className="w-full p-2 outline-none border rounded-sm"
               placeholder="Password"
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <button
               type="button"
               className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 transition"
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6 text-gray-400 "
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
                     className="size-6 text-gray-400"
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
         {error && <p className="text-red-600 text-sm text-center">{error}</p>}
         <button className="p-2 text-lg font-semibold hover:bg-orange-600 duration-300 bg-[#EF6F28] text-white rounded-sm">
            Add
         </button>
      </form>
   );
};

export default AddUserForm;
