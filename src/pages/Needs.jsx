import { Header } from "../components";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getDemands } from "../lib/crud";
import { getCategory, getPriority } from "../constants/demand";

function Needs() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["demands"],
    queryFn: getDemands,
    staleTime: 0,
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-16">
        <h3 className="font-bold text-base text-black mb-3">
          Senin İçin Önerilen Yardımlar
        </h3>
        <table className="w-full rounded-t-3xl">
          <tr className="bg-gray border-b-[1px] border-border">
            <th className="p-4 rounded-tl-3xl text-left">Adet</th>
            <th className="p-4 text-left">Kategori</th>
            <th className="p-4 text-left">Talep Noktası</th>
            <th className="p-4 rounded-tr-3xl text-left">Öncelik</th>
          </tr>
          {/* <tr className="bg-gray">
            <td className="p-4">350</td>
            <td className="p-4">Çadır</td>
            <td className="p-4">Ataşehir</td>
            <td className="p-4">Çok Önemli</td>
          </tr> */}
          {data.map((item, i) => {
            return (
              <tr className="bg-gray" key={i}>
                <td className="p-4">{item.amount}</td>
                <td className="p-4">{getCategory(item.category)}</td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">{getPriority(item.priority)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Needs;
