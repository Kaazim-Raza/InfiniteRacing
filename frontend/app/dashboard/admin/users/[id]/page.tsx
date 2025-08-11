// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import axios from "../../../../lib/axios"

// export default function AddUserPage() {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     role: "runner",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
     
//       console.log("Form data:", form)
//       const res = await axios.post("/admin/users", form)
//       if (res.status === 200) {
//         alert("User created successfully")
//         router.push("/dashboard/admin/users")
//       } else {
//         alert("Failed to create user")
//       }
//     } catch (err) {
//       console.error(err)
//       alert("Something went wrong")
//     }
//   }

//   return (
//     <div className="space-y-8">
//       <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Add New User</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg space-y-6 max-w-xl"
//       >
//         <div className="flex flex-col space-y-2">
//           <label className="text-[#EAEAE8] font-semibold">First Name</label>
//           <input
//             name="first_name"
//             type="text"
//             value={form.first_name}
//             onChange={handleChange}
//             required
//             className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label className="text-[#EAEAE8] font-semibold">Last Name</label>
//           <input
//             name="last_name"
//             type="text"
//             value={form.last_name}
//             onChange={handleChange}
//             required
//             className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label className="text-[#EAEAE8] font-semibold">Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label className="text-[#EAEAE8] font-semibold">Password</label>
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label className="text-[#EAEAE8] font-semibold">Role</label>
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
//           >
//             <option value="admin">Admin</option>
//             <option value="manager">Manager</option>
//             <option value="vice_manager">Vice Manager</option>
//             <option value="runner">Runner</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-[#EAEAE8] text-black font-bold px-6 py-3 hover:bg-white transition-all hover:scale-105"
//         >
//           Create User
//         </button>
//       </form>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import axios from "../../../../lib/axios"

export default function UserFormPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const isEditMode = userId !== "addUser"

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "runner",
  })

  const [loading, setLoading] = useState(isEditMode)

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/admin/users/${userId}`)
          const user = res.data
          setForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: "", // Leave empty for edit
            role: user.role,
          })
        } catch (err) {
          console.error("Failed to fetch user", err)
        } finally {
          setLoading(false)
        }
      }

      fetchUser()
    }
  }, [userId, isEditMode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isEditMode) {
        const formData = {password : "string", ...form}
        await axios.patch(`/admin/users/${userId}`, formData)
        alert("User updated successfully")
      } else {
        await axios.post("/admin/users", form)
        alert("User created successfully")
      }

      router.push("/dashboard/admin/users")
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  if (loading) return <p className="text-[#EAEAE8]">Loading user data...</p>

  return (
    <div className="space-y-8">
      <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">
        {isEditMode ? "Edit User" : "Add New User"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg space-y-6 max-w-xl"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-[#EAEAE8] font-semibold">First Name</label>
          <input
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
            required
            className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-[#EAEAE8] font-semibold">Last Name</label>
          <input
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
            required
            className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-[#EAEAE8] font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
          />
        </div>

        {!isEditMode && (
          <div className="flex flex-col space-y-2">
            <label className="text-[#EAEAE8] font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
            />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-[#EAEAE8] font-semibold">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="bg-transparent border border-[#868684]/30 px-4 py-2 rounded text-white"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="vice_manager">Vice Manager</option>
            <option value="runner">Runner</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#EAEAE8] text-black font-bold px-6 py-3 hover:bg-white transition-all hover:scale-105"
        >
          {isEditMode ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  )
}
