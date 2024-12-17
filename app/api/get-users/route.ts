import { NextResponse } from "next/server";

const API_URL = "https://dummyjson.com/users";

const transformJSON = (data: any) => {
  const departmentSummary: Record<string, any> = {};

  data.users.forEach((user: any) => {
    const department = user.company.department;

    if (!departmentSummary[department]) {
      departmentSummary[department] = {
        male: 0,
        female: 0,
        ageRange: null,
        hair: {},
        addressUser: {},
      };
    }

    //age
    departmentSummary[department][user.gender]++;

    //hair color
    const hairColor = user.hair.color;
    departmentSummary[department].hair[hairColor] =
      (departmentSummary[department].hair[hairColor] || 0) + 1;

    //address
    const fullName = `${user.firstName}${user.lastName}`;
    departmentSummary[department].addressUser[fullName] =
      user.address.postalCode;

    //ages
    const ages = data.users
      .filter((user: any) => user.company.department === department)
      .map((user: any) => user.age);
    departmentSummary[department].ageRange = `${Math.min(...ages)}-${Math.max(
      ...ages
    )}`;
  });

  return departmentSummary;
};

export async function GET() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    const transformedData = transformJSON(data);

    return NextResponse.json(transformedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users from API" },
      { status: 500 }
    );
  }
}
