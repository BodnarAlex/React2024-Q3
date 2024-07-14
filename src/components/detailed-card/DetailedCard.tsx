import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import type { IPeopleResponse } from "../../api/types.ts";
import { fetchData } from "../../api/api.ts";
import { Loader } from "../loader/Loader.tsx";

export function DetailedCard(): ReactNode {
  const { details } = useParams();
  const [person, setPerson] = useState<IPeopleResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPersonDetails = async (): Promise<void> => {
      if (details) {
        try {
          setIsLoading(true);
          const response = await fetchData(details, 1);
          if (response.results.length > 0) {
            setPerson(response.results[0]);
          } else {
            setPerson(undefined);
          }
        } catch (error) {
          console.error("Error fetching person details:", error);
          setPerson(undefined);
        } finally {
          setIsLoading(false);
        }
      }
    };

    void fetchPersonDetails();
  }, [details]);

  const handleCloseButtonClick = (): void => {
    if (location.pathname.includes("/details/")) {
      const params = new URLSearchParams(location.search);
      navigate({
        pathname: "/",
        search: params.toString(),
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!person) {
    return <div>No found for person.</div>;
  }

  const cardInfo = [
    { key: "1", label: "Mass", value: person.mass },
    { key: "2", label: "Height", value: person.height },
    { key: "3", label: "Gender", value: person.gender },
    { key: "4", label: "Hair Color", value: person.hair_color },
    { key: "5", label: "Eye Color", value: person.eye_color },
    { key: "6", label: "Skin Color", value: person.skin_color },
    { key: "7", label: "Birth Year", value: person.birth_year },
  ];

  return (
    <div key={person.created} className={styles.detailCard}>
      <button
        key={person.created}
        className={styles.closeButton}
        onClick={handleCloseButtonClick}
      >
        &#10006;
      </button>

      <h3 className={styles.name}>{person.name}</h3>
      {cardInfo.map((detail) => (
        <p key={detail.key} className={styles.paragraph}>
          {detail.label}: <span className={styles.detail}>{detail.value}</span>
        </p>
      ))}
    </div>
  );
}
