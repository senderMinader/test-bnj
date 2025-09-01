# Firebase
## Methode de recupération du dernier message de chaque conversation entre deux users

### Avoir une seule collection message ne suffirait pas pour cet opération.
Il faudrait d'abord avoir une autre collection conversation pour l'organisation de données
```json
{
  members : [{userId: string}, {userId: string}],
  lastMsg: {
      senderId: string,
      receiverId: string,
      timestamp: Date,
      text: string
    }
    
}
```

### On pourra après chercher par conversation pour récupérer le dernier message.
```javacript

const convRef = collection(db, "conversations").where("participants", "array-contains", userId).orderBy("lastMessage.timestamp", "desc");
const snapshot = await getDocs(convRef);

const lastMessage = snapshot.data().lastMsg;
```

Le grand avantage c'est l'utilisation d'une seule requete par utilisateur pour récuprer son dernier message pour chaque conversation.