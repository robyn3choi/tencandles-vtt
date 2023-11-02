import clsx from "clsx"
import { useDroppable } from "@dnd-kit/core"
import Die from "types/Die"
import DraggableDie from "./DraggableDie"
import DicePool from "enums/DicePool"
import { HOPE_DIE_ID } from "utils/constants"

type Props = {
  dicePool: DicePool
  dice: Die[]
  draggingDice: { dieId: number; username: string }[]
  showRollButton?: boolean
  onRoll?: () => void
  moreClasses?: string
}

export default function DroppableDicePool({
  dicePool,
  dice,
  draggingDice,
  showRollButton,
  onRoll,
  moreClasses,
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: dicePool,
  })

  const hopeDie = dice.find((d) => d.id === HOPE_DIE_ID)

  return (
    <div ref={setNodeRef} className={clsx(isOver && "bg-yellowTransparent", moreClasses)}>
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-center text-lg">{dicePool}</h2>
        {showRollButton && (
          <button
            onClick={onRoll}
            disabled={dice.length === 0}
            className="bg-yellow text-darkgrey text-lg px-4 pb-3 pt-2.5 hover:brightness-[110%]"
          >
            Roll
          </button>
        )}
      </div>
      <div
        className={clsx(
          dicePool === DicePool.Stash ? "w-[100px] flex-col" : "flex-wrap justify-center",
          "relative flex gap-1 mt-4"
        )}
      >
        {dicePool === DicePool.Stash && hopeDie && (
          <DraggableDie
            die={hopeDie}
            isDraggedByUsername={draggingDice.find((d) => d.dieId === HOPE_DIE_ID)?.username}
            moreClasses="mx-auto mb-2"
          />
        )}
        {dice.map((die, i) =>
          dicePool === DicePool.Stash && die.id === HOPE_DIE_ID ? null : (
            <DraggableDie
              die={die}
              isDraggedByUsername={draggingDice.find((d) => d.dieId === die.id)?.username}
              moreClasses={dicePool === DicePool.Stash ? "mx-auto -mb-14" : ""}
            />
          )
        )}
      </div>
    </div>
  )
}
