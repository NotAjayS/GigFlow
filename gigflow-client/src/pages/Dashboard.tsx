import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    source: "",
  });

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/leads`
      );

      setLeads(res.data.leads);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // HANDLE INPUT
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE LEAD
  const createLead = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leads/create`,
        formData
      );

      fetchLeads();

      setFormData({
        name: "",
        email: "",
        status: "",
        source: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE LEAD
  const deleteLead = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/leads/${id}`
      );

      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT LEAD
  const editLead = async (lead: any) => {
    const newStatus = prompt(
      "Enter new status (New / Contacted / Closed)",
      lead.status
    );

    if (!newStatus) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/leads/${lead._id}`,
        {
          ...lead,
          status: newStatus,
        }
      );

      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <div className="flex min-h-screen bg-gray-100">
    
    {/* SIDEBAR */}
    <div className="w-64 bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        GigFlow 🚀
      </h1>

      <ul className="space-y-6 text-lg">
        <li className="hover:text-gray-200 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-gray-200 cursor-pointer">
          Leads
        </li>

        <li className="hover:text-gray-200 cursor-pointer">
          Analytics
        </li>

        <li className="hover:text-gray-200 cursor-pointer">
          Settings
        </li>
      </ul>
    </div>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Leads Dashboard 🚀
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Total Leads</h2>
          <p className="text-3xl font-bold text-blue-600">
            {leads.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">New</h2>
          <p className="text-3xl font-bold text-green-500">
            {
              leads.filter(
                (lead: any) => lead.status === "New"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Contacted</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {
              leads.filter(
                (lead: any) =>
                  lead.status === "Contacted"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Closed</h2>
          <p className="text-3xl font-bold text-red-500">
            {
              leads.filter(
                (lead: any) => lead.status === "Closed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-wrap gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg w-60"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg w-60"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded-lg w-60"
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
          className="border p-3 rounded-lg w-60"
        />

        <button
          onClick={createLead}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Lead
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      />

      {/* LEADS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads
          .filter((lead: any) =>
            lead.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((lead: any) => (
            <div
              key={lead._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {lead.name}
              </h2>

              <p className="text-gray-600 mt-2">
                📧 {lead.email}
              </p>

              <p className="mt-3">
                Status:
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white text-sm font-semibold
                  ${
                    lead.status === "New"
                      ? "bg-green-500"
                      : lead.status === "Contacted"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {lead.status}
                </span>
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => editLead(lead)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLead(lead._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);
}