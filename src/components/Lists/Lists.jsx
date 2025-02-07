import { useEffect, useState } from "react";
import { createList, getAccountLists, deleteList } from "../../api";

export default function Lists() {
  const [lists, setLists] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
		const { value } = e.target.elements.name;
    try {
      await createList(value);
      const { data } = await getAccountLists();
			setLists(data.results);
    } catch (e) {
      console.log(e)
    }
		e.target.reset();
  }

  const handleClick = async (listId) => {
    try {
      await deleteList(listId);
      const { data } = await getAccountLists();
			setLists(data.results);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function fetchAccountLists() {
      try {
        const { data } = await getAccountLists();
        setLists(data.results);
      } catch (e) {
        console.log(e)
      }
    }

    fetchAccountLists();
  }, [])

  return (
		<section>
			<ul>
				{lists.map((el) => {
					return (
						<div key={el.id}>
							<button>{el.name}</button>
							<button onClick={() => handleClick(el.id)}>delete</button>
						</div>
					);
				})}
			</ul>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" />
				<button type="submit">Create list</button>
			</form>
		</section>
	);
}