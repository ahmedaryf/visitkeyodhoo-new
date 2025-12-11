// "use client";
// import React, { useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";

// export default function SignatureComponent() {
//   const sigRef = useRef(null);
//   const clearSignature = () => sigRef.current.clear();

//   return (
//     <div>
//       <h6>Signature</h6>
//       <SignatureCanvas
//         ref={sigRef}
//         penColor='black'
//         canvasProps={{
//           width: 450,
//           height: 200,
//           className: "signatureCanvas",
//         }}
//       />
//       <button type='button' onClick={clearSignature}>
//         Clear Signature
//       </button>
//     </div>
//   );
// }

"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function RegistrationForm() {
  const sigRef = useRef<SignatureCanvas | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
  });

  const clearSignature = () => sigRef.current?.clear();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const signature = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, signature }),
    });

    setLoading(false);

    if (res.ok) setSubmitted(true);
  };

  // Success screen
  if (submitted)
    return (
      <div className=' text-center py-20'>
        <h1 className='text-3xl font-bold text-green-600 mb-3'>
          Registration Completed ✔
        </h1>
        <p className='text-gray-600'>Thank you for registering.</p>
      </div>
    );

  return (
    <div className=' p-6'>
      <h1 className='text-3xl mb-6 text-gray-800'>Registration</h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg p-6 space-y-5'>
        {/* Full Name */}
        <div>
          <label className='block font-medium mb-1'>Full Name</label>
          <input
            type='text'
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className='w-full p-3 border rounded-lg focus:ring focus:ring-blue-300'
          />
        </div>

        {/* Phone */}
        <div>
          <label className='block font-medium mb-1'>Phone Number</label>
          <input
            type='text'
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className='w-full p-3 border rounded-lg focus:ring focus:ring-blue-300'
          />
        </div>

        {/* ID Number */}
        <div>
          <label className='block font-medium mb-1'>ID / Passport Number</label>
          <input
            type='text'
            required
            value={form.idNumber}
            onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
            className='w-full p-3 border rounded-lg focus:ring focus:ring-blue-300'
          />
        </div>

        {/* Signature */}
        <div>
          <label className='block font-medium mb-2'>Signature</label>

          <div className='border rounded-lg bg-gray-50 shadow-inner'>
            <SignatureCanvas
              ref={sigRef}
              penColor='black'
              canvasProps={{
                width: 200,
                height: 200,
                className: "rounded-lg mx-auto",
              }}
            />
          </div>

          <button
            type='button'
            onClick={clearSignature}
            className='mt-2 text-sm text-red-500 hover:underline'>
            Clear Signature
          </button>
        </div>

        {/* Submit button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-black/30 text-white rounded-lg text-lg font-semibold hover:bg-black/50 disabled:bg-gray-400'>
          {loading ? "Saving..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}
