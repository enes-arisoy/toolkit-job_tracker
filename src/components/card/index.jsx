import React from "react";
import styles from "./card.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt as Calendar,
  FaMapMarkerAlt as Marker,
} from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import api from "./../../utils/api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteJob, updateJob } from "../../redux/slices/jobSlice";
 
// Plugin'i aktif et
dayjs.extend(relativeTime);

// İngilizce dilini ayarla
dayjs.locale("en");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const date =
    job?.status === "Continue"
      ? "🟢 " + capitalize(dayjs(job?.date).fromNow()) + " applied."
      : job?.status === "Rejected"
      ? "🔴 On " + dayjs(job?.rejection_date).format("DD-MMMM") + " rejected."
      : "🟡 At " + dayjs(job?.interview_date).format("DD-MM-YYYY HH:mm") + " interview";

  const handleDelete = () => {
    api
      .delete(`/jobs/${job.id}`)
      .then(() => {dispatch(deleteJob(job.id));
    toast.success("Application is deleted!")})
      .catch(() => toast.error("Delete is failed!"));
      
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <h1>
            <span>{job.company[0]}</span>
          </h1>

          <div className={styles.info}>
            <h2>{job.position}</h2>
            <h4>{job.company}</h4>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link to={`/job/${job.id}`}>
            <button>
              <MdEdit />
            </button>
          </Link>
          <button onClick={handleDelete}>
            <MdDelete />
          </button>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.body}>
        <p>
          <Marker />
          {job.location}
        </p>

        <div className={styles.bottom}>
          <span>
            <Calendar />
            {date}
          </span>
          <span>{job.type}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
