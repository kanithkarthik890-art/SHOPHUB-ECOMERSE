import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../services/api";


function Profile() {

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [pincode, setPincode] = useState("");

  const [phone, setPhone] = useState("");


  useEffect(() => {

    fetchProfile();

  }, []);


  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await api.get(

        "/users/profile",

        {

          headers: {

            Authorization:

            `Bearer ${token}`,

          },

        }

      );


      setAddress(

        res.data.user.address || ""

      );

      setCity(

        res.data.user.city || ""

      );

      setState(

        res.data.user.state || ""

      );

      setPincode(

        res.data.user.pincode || ""

      );

      setPhone(

        res.data.user.phone || ""

      );

    }

    catch (error) {

      console.log(error);

    }

  };


  const saveProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");


      await api.put(

        "/users/profile",

        {

          address,

          city,

          state,

          pincode,

          phone,

        },

        {

          headers: {

            Authorization:

            `Bearer ${token}`,

          },

        }

      );


      toast.success(

        "Address Saved Successfully ✅"

      );

    }

    catch (error) {

      console.log(error);

      toast.error(

        "Failed To Save Address ❌"

      );

    }

  };


  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">

        My Profile

      </h1>


      <div className="bg-white p-8 rounded-2xl shadow-lg">

        <div className="space-y-5">

          <input

            type="text"

            placeholder="Address"

            value={address}

            onChange={(e)=>

              setAddress(

                e.target.value

              )

            }

            className="w-full border p-3 rounded-lg"

          />


          <input

            type="text"

            placeholder="City"

            value={city}

            onChange={(e)=>

              setCity(

                e.target.value

              )

            }

            className="w-full border p-3 rounded-lg"

          />


          <input

            type="text"

            placeholder="State"

            value={state}

            onChange={(e)=>

              setState(

                e.target.value

              )

            }

            className="w-full border p-3 rounded-lg"

          />


          <input

            type="text"

            placeholder="Pincode"

            value={pincode}

            onChange={(e)=>

              setPincode(

                e.target.value

              )

            }

            className="w-full border p-3 rounded-lg"

          />


          <input

            type="text"

            placeholder="Phone Number"

            value={phone}

            onChange={(e)=>

              setPhone(

                e.target.value

              )

            }

            className="w-full border p-3 rounded-lg"

          />


          <button

            onClick={saveProfile}

            className="

            bg-blue-600

            hover:bg-blue-700

            text-white

            px-6

            py-3

            rounded-lg

            transition

            "

          >

            Save Address

          </button>

        </div>

      </div>

    </div>

  );

}


export default Profile;