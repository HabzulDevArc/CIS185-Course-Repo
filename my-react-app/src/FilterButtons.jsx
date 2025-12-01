function FilterButtons({ currentFilter, onFilterChange }) {
    const filters = ['all', 'active', 'completed']

    return (
        <div className="filter-buttons">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={currentFilter === filter ? 'active' : ''}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}    
                </button>    
            ))}
        </div>
    )
}

export default FilterButtons