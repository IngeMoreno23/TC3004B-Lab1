import { useState } from "react";

export const AddCategory = ({ onNewCategory } : { onNewCategory: (category: string) => void }) => {
    const [inputValue, setInputValue] = useState('');

    const onInputChange = ({ target }: { target: HTMLInputElement }) => {
        setInputValue(target.value);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim().length <= 1) return;
        // setCategories( categories => [ inputValue, ...categories ]);
        setInputValue('');
        onNewCategory(inputValue.trim());
    }
    
    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Input:</label>
            <input type="text" placeholder="Buscar images" value={inputValue}
                onChange={onInputChange} />
        </form>
    )
}