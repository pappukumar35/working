import { useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      alert("❌ You must be logged in to create a campaign.");
      return router.push("/create-campaign");
    }

    try {
      await API.post(
        "campaigns/",
        { title, description, goal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Campaign created successfully!");
      router.push("/campaigns/${id}");
    } catch (error) {
      console.error(error);
      alert("❌ Error creating campaign.");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f3f4f6" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  {/* Form Section */}
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mt-4">
                      🎯 Create Campaign
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleCreate}>
                      <div className="form-outline mb-4">
                        <label className="form-label">Campaign Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Goal Amount (₹)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          ➕ Submit Campaign
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Image Section */}
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://wallpapers.com/images/hd/web-developerat-work-illustration-png-9wxnnbpbatv5o2dn.png"
                      className="img-fluid"
                      alt="Developer working"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
