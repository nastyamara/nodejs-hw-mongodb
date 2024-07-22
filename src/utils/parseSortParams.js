import { sortOrderList, fieldList } from "../constants/contacts.js";

const parseSortParams = ({ sortBy, sortOrder }) => {
    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder
    }
}


export default parseSortParams;