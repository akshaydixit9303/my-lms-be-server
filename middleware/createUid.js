export const createUid = (name, domain_id) => {
  // Split the name into an array
  const nameParts = name.split(" ");
  const uidName = name.split(" ");

  // Extract the last name (last element of the array)
  const lastName = nameParts.pop();

  // Join the remaining parts to form the first name
  const firstName = nameParts.join(" ");

  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);

  const uid = uidName.join(".").toLowerCase() + domain_id;
  return { firstName, lastName, uid };
};
