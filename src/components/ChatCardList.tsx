interface ChatCardListProps<T> {
   items: T[]; 
   renderItem: (item: T, index: number) => React.ReactNode;
}

function ChatCardList<T>({ items, renderItem }: ChatCardListProps<T>) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 pr-24 md:pr-0  gap-6 auto-rows-fr">
         {items.map((item, index) => (
            <div key={index} className="flex items-stretch h-full">
               {renderItem(item, index)}
            </div>
         ))}
      </div>
   );
}

export default ChatCardList;
