interface ChatCardListProps<T> {
   items: T[];
   renderItem: (item: T, index: number) => React.ReactNode;
}

function ChatCardList<T>({ items, renderItem }: ChatCardListProps<T>) {
   return (
      <div className="flex gap-x-4">
         {items.map((item, index) => (
            <div key={index}>{renderItem(item, index)}</div>
         ))}
      </div>
   );
}

export default ChatCardList;
