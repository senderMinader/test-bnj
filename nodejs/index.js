const users = [
  { name: "Alice", dob: "2000-02-29" },
  { name: "Bob", dob: "1990-12-31" },
  { name: "Charlie", dob: "2005-08-28" },
  { name: "David", dob: "2008-05-15" },
  { name: "Noel", dob: "2007-12-25" },
  { name: "Paul", dob: "2007-09-30" },
  { name: "André", dob: "2007-09-01" },
];

function stringToDate(dateString) {
  // en supposant que c'est le frontend qui gère le format de date (YYYY-MM-DD)
  const [annee, mois, jour] = dateString.split("-").map(Number); // Convertis en nombres chaque élément du dateString
  return new Date(annee, mois - 1, jour);
}

export default function getAdults(users) {
  return users.filter((user) => {
    if (!user.dob) return false; // Filtre les utilisateurs sans date de naissance
    const today = new Date();
    const userDate = new stringToDate(user.dob);

    // Defini une date de reference pour les tests
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    return userDate <= minDate;
  });
}

// Exemple d'utilisation : node index.js
console.log(getAdults(users));
