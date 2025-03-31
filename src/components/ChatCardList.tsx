interface ChatCardListProps<T> {
   items: T[]; 
   renderItem: (item: T, index: number) => React.ReactNode;
}

function ChatCardList<T>({ items, renderItem }: ChatCardListProps<T>) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-5 pr-24 md:pr-0 gap-y-6 gap-x-4 auto-rows-fr">
         {items.map((item, index) => (
            <div key={index} className="flex items-stretch h-full">
               {renderItem(item, index)}
            </div>
         ))}
      </div>
   );
}

export default ChatCardList;
