'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [role] = useState('staff'); // default to 'staff'
  const router = useRouter();

  const handleSignup = async () => {
    if(!name || !email || !password || !repassword){
      alert("All informations are required.");
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if(!email.includes("@")){
      alert("Invalid email format.");
      return;
    }
    if(password !== repassword){
      alert("Password does not match.");
      return;
    }
    try{
      const res = await axios.post("https://vendor-dashboard-t7pq.onrender.com/api/auth/signup",{name, email, password, role});
      if(res.data.success)
      {
        alert("Signup Successful.");
        router.push('/dashboard');
      }
      else{
        alert(res.data.message || "Sugnup failed.");
      }
    }
    catch (err){
      console.error(err);
      alert("An error occured while signup.");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={repassword}
          onChange={(e) => setrePassword(e.target.value)}
          placeholder="Re-Enter-Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}