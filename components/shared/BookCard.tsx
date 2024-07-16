import { Link } from "expo-router";
import { Button, Image, Stack } from "tamagui";

import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Book } from "@/lib/validation";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isBookAvailable = Number(book.available_examples) !== 0;
  return (
    <View bw="$1" bc="$borderColor" br="$4" shadowRadius="$2">
      <View pos="relative" ov="hidden" btlr="$4" btrr="$4" h={400}>
        <Image
          source={{ uri: book.cover_url, height: 400 }}
          w="100%"
          h="100%"
          alt={book.title}
        />
        <Text
          pos="absolute"
          bg="white"
          style={{ color: "black" }}
          r={0}
          t={0}
          p="$1"
          paddingHorizontal="$2"
          btlr="$4"
          btrr="$4"
          fs={14}
        >
          {book.category.name}
        </Text>
        <Stack
          pos="absolute"
          ai="center"
          jc="center"
          bg={isBookAvailable ? "$green10" : "$red10"}
          aspectRatio={1}
          w={32}
          r="$2"
          b="$2"
          br={9999}
        >
          <Text fs={14} fontWeight="bold" style={{ color: "white" }}>
            {book.available_examples}
          </Text>
        </Stack>
      </View>
      <View dsp="flex" p="$4" gap="$2" bg="$colorTransparent">
        <View>
          <Link href={`/books/${book.isbn}`}>
            <Text fontWeight="bold" fontSize={20}>
              {book.title}
            </Text>
          </Link>
          <Text className="text-sm">{book.author.name}</Text>
        </View>
        {isBookAvailable && (
          <Link href={`/books/${book.isbn}/borrow`} asChild>
            <Button theme="green">Emprunter</Button>
          </Link>
        )}
        {!isBookAvailable && (
          <Button disabled opacity={0.8}>
            Indisponible
          </Button>
        )}
      </View>
    </View>
  );
};

/* export const BookCardSkeleton = () => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="relative p-0 mb-6 h-[300px]">
        <Skeleton className="rounded-t-lg object-cover object-center overflow-hidden h-full" />
        <Skeleton className="absolute !m-0 right-0 top-0 p-1 px-2 h-6 w-[70px] rounded-bl-lg border border-t-0 border-l-0" />
        <Skeleton className="border absolute bottom-2 right-2 rounded-full w-10 h-10" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-2 w-[70%]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
} */
