

function EmployeeInfo({employee}) {
  const birtDayFormatted = new Date(employee.birthday).toLocaleDateString("es-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <p>Employee ID: {employee.employee_id}</p>
      <p>Name: {employee.first_name} {employee.last_name}</p>
      <p>Birthday: {birtDayFormatted}</p>
      <p>Age: {employee.age}</p>
    </div>
  );
}

export default async function Home() {
const data = await fetch("http://localhost:3000/api/getData");
const result = await data.json();
return (
  <div className="text-white">  
    {
      result.map((employee) => {
        return <EmployeeInfo employee={employee} />
      })
    }
    
  </div>
);
}