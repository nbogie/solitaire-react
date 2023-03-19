import { Dispatch } from "react";
import { Card } from "../gameCore/card";
import { Action } from "../reducer/action";
import { CardC } from "./CardC";
import { PlaceholderC } from "./PlaceholderC";

interface DiscardPileCProps {
    dispatch: Dispatch<Action>;
    discardPile: Card[];
}
export function DiscardPile({
    dispatch,
    discardPile,
}: DiscardPileCProps): JSX.Element {
    return (
        <div
            className="DiscardPile"
            onClick={() =>
                discardPile.length === 0
                    ? () => {}
                    : dispatch({
                          name: "select-card",
                          card: discardPile[discardPile.length - 1],
                      })
            }
        >
            {discardPile.length > 0 ? (
                <CardC
                    {...{
                        card: discardPile.at(-1)!,
                        dispatch,
                        handleClickedCard: () => {},
                        handleClickedFaceDownCard: () => {},
                        cardOrigin: { name: "discard-pile" },
                        isDragOrigin: true,
                        isDropTarget: false,
                    }}
                />
            ) : (
                <PlaceholderC />
            )}
        </div>
    );
}