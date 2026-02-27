export const GifItem = ({ title, url, id } : { title: string, url: string, id: string }) => {
    return (
        <div className='card'>
            <img src={url} alt={title} />
            <p> {title} </p>
        </div>
    )
}