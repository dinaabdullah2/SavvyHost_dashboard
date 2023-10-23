import { Skeleton } from "@mantine/core";

const data = [
    {
      name: 'Athena Weissnat',
      company: 'Little - Rippin',
      email: 'Elouise.Prohaska@yahoo.com',
    },
    {
      name: 'Deangelo Runolfsson',
      company: 'Greenfelder - Krajcik',
      email: 'Kadin_Trantow87@yahoo.com',
    },
    {
      name: 'Danny Carter',
      company: 'Kohler and Sons',
      email: 'Marina3@hotmail.com',
    },
    {
      name: 'Trace Tremblay PhD',
      company: 'Crona, Aufderhar and Senger',
      email: 'Antonina.Pouros@yahoo.com',
    },
    {
      name: 'Derek Dibbert',
      company: 'Gottlieb LLC',
      email: 'Abagail29@hotmail.com',
    }]

    type TableSkelton_TP = {
        loading?:boolean
    }
const TableSkelton = ({loading}:TableSkelton_TP) => {

    const rows = Array(6).fill(6).map(() => (
        <tr className="border-b hover:bg-gray-50 border-[#f3f3f3]">
            <td className="p-5"><Skeleton className="md:w-[80%] w-[100%]" height={10} radius='md' visible={loading} /></td>
            <td className="p-5"><Skeleton className="md:w-[80%] w-[100%]" height={10} radius='md' visible={loading} /></td>
            <td className="p-5"><Skeleton className="md:w-[80%] w-[100%]" height={10} radius='md' visible={loading} /></td>
            <td className="p-5"><Skeleton className="md:w-[80%] w-[100%]" height={10} radius='md' visible={loading} /></td>
            <td className="p-5"><Skeleton className="md:w-[80%] w-[100%]" height={10} radius='md' visible={loading} /></td>

        </tr>
    ));

  return (


<table className="w-full p-5  rounded bg-white border-gray-50 shadow" >
  <tr className="border-b  bg-gray-50">
    <th className="text-left p-5"><Skeleton className="md:w-[80%] w-[100%]" radius='md' height={10} visible={loading} /></th>
    <th className="text-left p-5"><Skeleton className="md:w-[80%] w-[100%]" radius='md' height={10} visible={loading} /></th>
    <th className="text-left p-5"><Skeleton className="md:w-[80%] w-[100%]" radius='md' height={10} visible={loading} /></th>
    <th className="text-left p-5"><Skeleton className="md:w-[80%] w-[100%]" radius='md' height={10} visible={loading} /></th>
    <th className="text-left p-5"><Skeleton className="md:w-[80%] w-[100%]" radius='md' height={10} visible={loading} /></th>
  </tr>
        {rows}
   </table>

  );

}

export default TableSkelton
