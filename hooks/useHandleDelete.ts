import { useRouter } from 'next/navigation';

export default function useHandleDeleteSondage() {
  const router = useRouter();
  async function handleDeleteSondage(sondageId: string) {
    try {
      let response = await fetch(
        "/api/sondages/deleteSondage?id=" + sondageId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      router.refresh()
    } catch (error) {
      console.log("An error occurred while deleting sondage ", error);
    }
  }

  return handleDeleteSondage;
};
