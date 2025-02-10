import { Button } from "./Button";

export default function Table({ data, onDelete }) {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          <th className="border p-2">Nama</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border p-2 text-center">{item.id}</td>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2 text-center">
              <Button className="mr-2">Edit</Button>
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
