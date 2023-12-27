import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useUser } from "context/UserContext"
import CardDraggable from "./CardDraggable"

export default function CardStack({ onClose }: { onClose: () => void }) {
  const { cards } = useUser()

  return (
    <>
      <div className="h-screen w-screen fixed bg-black opacity-40 z-50" onClick={() => onClose()} />
      {/* <SortableContext items={cards}> */}
      <div className="absolute z-50 mb-[250px]">
        {cards.map((card) => (
          <CardDraggable key={card.id} card={card} />
        ))}
      </div>
      {/* </SortableContext> */}
    </>
  )
}
