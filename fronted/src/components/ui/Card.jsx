export function Card({ children, className }) {
  return (
    <div className={`bg-zinc-900 p-14 rounded-md clasname ${className}`}>
        {children}
    </div>
  )
}

export default Card