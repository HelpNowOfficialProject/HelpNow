import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import app from "../../firebase";

export default function HelpList() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "posts"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{" "}
            {value.docs.map((doc) => (
              <div>{JSON.stringify(doc.data())}, </div>
            ))}
          </span>
        )}
      </p>
    </div>
  );
}
