import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./form.module.scss";
import { statusOptions, typeOptions } from "./../../utils/constants";
import Input from "./input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob, updateJob } from "../../redux/slices/jobSlice";
import api from "./../../utils/api";
import { toast } from "react-toastify";

const Form = () => {
  const { mode } = useParams();
  const [editItem, setEditItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "create") return setEditItem(null);
    // Eğer mod "edit" ise, düzenlenecek başvuruyu al
    api
      .get(`/jobs/${mode}`)
      .then((res) => {
        setEditItem(res.data);
        setSelectedStatus(res.data.status);
      })
      .catch(() => {
        toast.error("Failed to fetch job data.");
      });
  }, [mode]);
  // form gönderilince
  const handleSubmit = (e) => {
    // Formun varsayılan davranışını engelle
    // (sayfanın yenilenmesini önlemek için)
    e.preventDefault();
    // Form verilerini bir nesneye çevir
    const formData = new FormData(e.target);
    const jobdata = Object.fromEntries(formData.entries());

    if (!editItem) {
      // api endpointine yeni başvuru gönder
      api
      .post("/jobs", jobdata)
      .then((res) => {
        dispatch(createJob(res.data));
        // applications sayfasına yönlendir
        navigate("/");
        // bildirim gönder
        toast.success("Application created successfully!");
      })
      .catch(() => {
        toast.error("Failed to create application.");
      });
    } else {
      // api'ye mevcutu güncellemek için istek gönder
      api.patch(`/jobs/${editItem.id}`, jobdata)
      .then((res) => {
        // düzenlenen başvuru redux store'a ekle
        dispatch(updateJob(res.data));
        // başvuru lar sayfasına yönlendir
        navigate("/");
        // bildirim gönder
        toast.success("Application updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update application.");
      });
    }
  };

  // seçili status değerine göre date alanının name değeri
  const dateName =
    selectedStatus === "Interview"
      ? "Interview Date"
      : selectedStatus === "Rejected"
      ? "Rejection Date"
      : "Application Date";

      // tarih alanının değerini ayarla
  const dateValue =
    editItem &&
    new Date(editItem[dateName])
      .toString()
      .slice(0, editItem.status === "Interview" ? 16 : 10);
  return (
    <div className={styles.formPage}>
      <section className={styles.field}>
        <h2>{editItem? "Update Application" : "Create New Application"}</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Position" name="position" value={editItem?.position} />
          <Input label="Company" name="company" value={editItem?.company} />
          <Input label="Location" name="location" value={editItem?.location} />
          <Input
            label="Status"
            name="status"
            options={statusOptions}
            handleChange={(e) => setSelectedStatus(e.target.value)}
            value={editItem?.status}
          />
          <Input
            label="Type"
            name="type"
            options={typeOptions}
            value={editItem?.type}
          />
          <Input
            label={
              selectedStatus === "Interview"
                ? "Interview Date"
                : selectedStatus === "Rejected"
                ? "Rejection Date"
                : "Application Date"
            }
            name={dateName}
            type={selectedStatus === "Interview" ? "datetime-local" : "date"}
            value={dateValue}
          />

          <div className={styles.btnWrapper}>
            <button>{editItem? "Update" : "Create"}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
