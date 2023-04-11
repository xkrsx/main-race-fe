import {Category} from "types";

interface Props {
    id: string;
    number: number;
    name: string;
    category: Category;
    points: number;
    penalties: number;
}

export const ResultsListRow = (props: Props) => <tr key={props.id}>
    <td>{props.number}</td>
    <td>{props.name}</td>
    <td>{props.category}</td>
    <td>{props.points}</td>
    <td>{props.penalties}</td>
    <td>{props.points - props.penalties}</td>
</tr>