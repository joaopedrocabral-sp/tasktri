import { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Container, ItemsContainer } from './styles';

function FetchItems() {
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
            const listCollection = collection(db, "usersTasks", user.uid, "lista");
            const unsubscribe = onSnapshot(listCollection, (snapshot) => {
                const fetchedItems = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(fetchedItems);
            });
            return () => unsubscribe();
        }
    }, []);

    const handleToggleComplete = async (id, completed) => {
        if (userId) {
            const itemDoc = doc(db, "usersTasks", userId, "lista", id);
            await updateDoc(itemDoc, { completed: !completed });
        }
    };

    return (
        <Container>
            <ItemsContainer>
                <h3>Lista</h3>
                <div>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleToggleComplete(item.id, item.completed)}
                                />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </ItemsContainer>
        </Container>
    );
}

export default FetchItems;
