import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
type Note = {
  id: string;
  title: string;
  body: string;
  tagIds: string[];
};

export function NoteCard({ title, body, tagIds, id }: Note) {
  const [LSTags, setLSTags] = useLocalStorage<Tag[]>('tags', []);

  const noteTags = tagIds.map((tagId) => {
    return LSTags.find((tag) => {
      return tag.id == tagId;
    });
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-medium">{title}</CardTitle>
        <CardDescription className="flex gap-2">
          {noteTags.length > 0 ? (
            noteTags.map((tag) => {
              return (
                <Button key={tag?.id} size="sm">
                  {tag?.label}
                </Button>
              );
            })
          ) : (
            <p className="text-gray-500">no current tag</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-4">
          {body} Here is a text of 50 lines: The old lighthouse stood sentinel
          on the craggy coast, its beacon sweeping the tumultuous waves. Each
          night, its steady rhythm guided ships through the treacherous shoals
          and hidden rocks. Inside, the keeper, an elderly man named Silas,
          meticulously maintained the intricate machinery. He knew every gear,
          every lens, every creak and groan of the ancient structure. For
          decades, the sea had been his only companion, its vastness both a
          comfort and a constant reminder of isolation. A storm was brewing on
          the horizon, a bruised purple band stretching across the western sky.
          Silas felt it in his bones, a familiar ache preceding nature's fury.
          The wind began to howl, a mournful lament around the stone tower. Rain
          lashed against the thick glass, distorting the world outside into a
          watery blur. But Silas remained calm, his hands steady as he checked
          the fuel lines. Down in the nearby village, the fishermen pulled their
          boats high onto the shore. Their faces were grim, etched with the
          wisdom of generations who had battled the ocean. Children clung to
          their mothers, their eyes wide with a mixture of fear and fascination.
          The village dogs barked nervously, sensing the impending chaos.
          Everyone knew the lighthouse was their guardian, their silent
          protector against the deep. The storm hit with a vengeance, a
          maelstrom of wind and water. The lighthouse trembled, but its
          foundations held firm, deeply rooted in the bedrock. Silas watched as
          towering waves crashed against the base, sending spray high into the
          air. He felt the vibrations, a primal roar that filled the small,
          circular room. The light, however, never wavered, a defiant star in
          the inky blackness. Through the night, the battle raged. Silas thought
          of the ships, those fragile specks of humanity navigating the
          maelstrom. He thought of his own youth, a time when he too had braved
          such storms on the open sea. A fleeting moment of regret for a life
          lived largely in solitude passed through him. But then his focus
          returned to the task, the sacred duty of the light. As dawn
          approached, the storm began to relent, its power slowly waning. The
          wind softened to a weary sigh, and the rain subsided to a gentle
          drizzle. Silas looked out, his eyes tired but resolute, at the ravaged
          seascape. Debris floated on the churning water, remnants of the
          night's fury. But the sea, though bruised, was already beginning its
          slow return to calm. He saw a ship, battered but afloat, limping
          towards the distant harbor. A faint glimmer of a wave from its deck, a
          silent thank you. Silas nodded, a small, private gesture of
          acknowledgement. His duty was done, for now, until the next darkness
          fell. The sun peeked over the eastern horizon, painting the sky with
          hues of hope.
        </div>
        ...
        <Link to={`note/${id}`} className="text-green-400">
          read more
        </Link>
      </CardContent>
    </Card>
  );
}

export function SkeletonNoteCard() {
  return (
    
    <Card className="max-w-full min-w-64">
      <CardHeader>
        <CardTitle className="w-full text-2xl font-medium">
          <Skeleton className="h-[36px] w-full rounded-xl" />
        </CardTitle>
        <CardDescription className="my-4 flex w-full space-x-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32" />
      </CardContent>
    </Card>
  );
}
