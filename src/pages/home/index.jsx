import React from "react";
import { useSelector } from "react-redux";
import Error from "./../../components/error/index";
import Loader from "./../../components/loader/index";
import styles from "./home.module.scss";
import Card from "../../components/card";

const Home = () => {
  const { isLoading, error, jobs } = useSelector((store) => store.jobReducer);

  // sorun: bir dizi içerisindeki verileri status değerlerine göre gruplandırarak kategorize etmek istiyoruz.

  // cevap: reduce dizi metodunu kullanarak dizi içerisindeki verileri status değerlerine göre gruplandırabiliriz.

  const acc = jobs.reduce((acc, job) => {
    // oluşturduğumuz nesnede statuse karşılık gelen dizi yoksa oluştur.
    if (!acc[job.status]) {
      acc[job.status] = [];
    }

    // işin status değerine karşılık gelen diziye işi pushla
    acc[job.status].push(job);

    // nesnenin son halini return et
    return acc;
  }, {});

  // **nesnelerde [] kullanımı

  // *object["key"]
  // const kisi = { isim: "ahmet", soyad: "yıldız", yas: 65, };

  // const alan = "isim";

  // alan değişkenin değerinin kişi nesnesi içerisindeki karşılığına eriş kisi["isim"]; // ahmet kisi["yas"]; // 65 kisi["soyad"]; // "yıldız"

  // kisi[alan]; // ahmet


  if (isLoading)
    return (
      <div className={styles.layout}>
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className={styles.layout}>
        <Error message={error} />
      </div>
    );
  return (
    <div className={styles.layout}>

{/* acc nesnesi içerisindeki status değerlerine göre gruplandırılmış işleri listele, acc nesnesi içerisindeki her bir status için bir başlık ve altında o statüdeki işleri listele */}

      <div className={styles.stack}>
        {Object.keys(acc).map((status, key) => (
        <div className={styles.group} key={key}>
          <h1>{status}</h1>

          <div className={styles.list}>
            {acc[status].map((job, key) => (
              <Card job={job} key={key} />
            ))}
          </div>
          
        </div>
      ))}
      </div>
    </div>
  );
};

export default Home;
